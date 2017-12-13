insert into T_STATUS(id, name) values('status1', 'This is status 1');
insert into T_STATUS(id, name) values('status2', 'This is status 2');
insert into T_STATUS(id, name) values('status3', 'This is status 3');

insert into T_CUSTOMER(name) values('CUSTOMER 1');
insert into T_CUSTOMER(name) values('CUSTOMER 2');
insert into T_CUSTOMER(name) values('CUSTOMER 3');
insert into T_CUSTOMER(name) values('CUSTOMER 4');
insert into T_CUSTOMER(name) values('CUSTOMER 5');

insert into T_ORDER(num, name, status_id, source_id, dest_id, date) values('N-1', 'order 1', 'status1', 2, 3, DATE '2017-01-30');
insert into T_ORDER(num, name, status_id, source_id, dest_id, date) values('N-2', 'order 2', 'status2', 4, 5, DATE '2017-12-15');
