package ru.avel.example.orders.controllers;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public abstract class ACrudController<T, ID extends Serializable> {
	
	protected final Logger logger = LoggerFactory.getLogger( this.getClass() );

	private final CrudRepository<T, ID> repository;
	private final Class<T> classEntity;
	private final Class<ID> classKey;
	
	/*
	 * Требуется вызвать в конструкторе потомка, который должен иметь параметр repository конкретного типа (будет внедрен). 
	 */
	@SuppressWarnings("unchecked")
	protected ACrudController( CrudRepository<T, ID> repository ) {
		this.repository = repository;
		ParameterizedType paramType = (ParameterizedType) this.getClass().getGenericSuperclass(); 
		Type[] params = paramType.getActualTypeArguments();
		classEntity = (Class<T>) params[0]; 
		classKey = (Class<ID>) params[1];
	}

	protected T newEntity() {
		T obj = null;
		try {
			obj = classEntity.newInstance();
		} catch (InstantiationException | IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return obj;
	}

	
	@GetMapping
	public Iterable<T> list() {
		logger.debug("LIST");
		return repository.findAll();
	}

	@GetMapping("/{id}")
	public T read( @PathVariable ID id ) {
		T obj = repository.findOne( id );
		logger.debug("READ: " + obj.toString());
		return obj;
	}

	@RequestMapping(method = {RequestMethod.POST, RequestMethod.PUT}, consumes = "application/json")
	public T create( @RequestBody T obj ) {
		logger.debug("CREATE: " + obj.toString());
		obj = repository.save( obj );
		return obj;
	}

	@RequestMapping(path="/{id}", method = {RequestMethod.POST, RequestMethod.PUT}, consumes = "application/json")
	public T update( @PathVariable ID id, @RequestBody(required = false) T obj ) {
		if ( obj == null ) obj = delete( id );
		else {
			logger.debug("UPDATE: " + obj.toString());
			obj = repository.save( obj );
		}
		return obj;
	}
	
	@DeleteMapping(path="/{id}")
	public T delete( @PathVariable ID id ) {
		T obj = read( id );
		if (obj != null) {
			logger.debug("DELETE: " + obj.toString());
			repository.delete( id );
		}
		return obj;
	}
	

	/*	
	 *	Utils
	 */
	
	
	public void setParams( T obj, Map<String, String> params ) {
		for (Field f : classEntity.getDeclaredFields()) {
			if ( !f.isAnnotationPresent( javax.persistence.Column.class )
				&& !f.isAnnotationPresent( javax.persistence.JoinColumn.class ) ) continue;
			String field = f.getName();
			if ( !params.containsKey( field ) ) continue;
			String param = params.get( field );
			field = classEntity.getSimpleName() + "." + field;
			logger.debug("Значение атрибута: {}={}", field, param );

			Object value = valueOf( f.getType(), param, false );
			if ( value == null && param != null && !param.isEmpty() ) continue;
			
			try {
				f.setAccessible( true );
				f.set( obj, value );
			} catch (Exception e) {
				logger.error("Ошибка установки атрибута " + field, e);
				continue;
			} finally {
				f.setAccessible(false);
			}
		}
	}
	
	private Object valueOf(Class<?> type, String value, boolean failure) {
		if ( String.class.equals( type ) ) return value; 
		String msg;
		Method method;
		try {
			method = type.getMethod( "valueOf", String.class );
		} catch (Exception e) {
			msg = "Не определен метод " + type.getSimpleName() + ".valueOf(String)";
			if (failure) throw new RuntimeException(msg, e);
			logger.debug(msg, e);
			return null;
		}
		try {
			return method.invoke( type, value );
		} catch (Exception e) {
			msg = "Ошибка valueOf(\"" + value + "\") для класса " + type.getName();
			if (failure) throw new RuntimeException(msg, e);
			logger.error(msg, e);
		}
		return null;
	}
	
	/**
	 * Хардкодное преобразование String в дженерик
	 */
	@SuppressWarnings("unchecked")
	protected ID keyValue(String value) {
		return (ID) valueOf( classKey, value, true);
	}
	
}
