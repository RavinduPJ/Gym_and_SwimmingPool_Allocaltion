CREATE DATABASE GASA;

CREATE TABLE timeslots(
    timeslot_id SERIAL PRIMARY KEY,
    timeslot_value VARCHAR(10)
);

CREATE TABLE department(
    dept_id SERIAL PRIMARY KEY,
    dept_name VARCHAR(100),
);

CREATE TABLE gymtimeallocation(
    date_value DATE,
    timeslot_id INT,
    user_count INT,

    CONSTRAINT PK_gymtimeallocation PRIMARY KEY(date_value,timeslot_id),
    CONSTRAINT FK_gymtimeid FOREIGN KEY (timeslot_id) REFERENCES timeslots(timeslot_id)
);

CREATE TABLE pooltimeallocation(
    date_value DATE,
    timeslot_id INT,
    user_count INT,

    CONSTRAINT PK_pooltimeallocation PRIMARY KEY(date_value,timeslot_id),
    CONSTRAINT FK_pooltimeid FOREIGN KEY (timeslot_id) REFERENCES timeslots(timeslot_id)
);

CREATE TABLE user_details(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    epfnumber INT,
    dpt_id INT,
    bookingdate DATE,
    bookingtimeslotid INT,
    bookingplace VARCHAR(5),

    CONSTRAINT FK_booking_id FOREIGN KEY (bookingtimeslotid) timeslots(timeslot_id),
    CONSTRAINT FK_dept_id FOREIGN KEY (dpt_id) REFERENCES department(dept_id)
);