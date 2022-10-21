CREATE TABLE timeslots(
    timeslot_id SERIAL PRIMARY KEY,
    timeslot_valur VARCHAR(10)
);

CREATE TABLE timeallocation(
    date_value DATE,
    timeslot_valur VARCHAR(10),
	timeslot_id INT,
	user_count INT,
	CONSTRAINT PK_timeallocation PRIMARY KEY(date_value,timeslot_id)
)

CREATE TABLE user_details(
    username VARCHAR(100),
    email VARCHAR(100),
	epfnumber INT PRIMARY KEY,
	bookingdate DATE,
	bookingtimeslotid INT
)