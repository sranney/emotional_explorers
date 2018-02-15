# Emotional Explorers

Visit https://emotionalexplorers.herokuapp.com to check out the site!

Site for teaching children with autism how to understand emotions.

Uses Node.js, Express, MySQL and Sequelize, Handlebars, Passport.js and AWS to set up personalized quiz modules for students to take quizzes and counselors for analyzing their students' results.

The homepage for the student is customizable. The student can choose from several different profile pictures and backgrounds to make their homepage personal to them.

The student's score profile is secure and protected through several methods. One, the student sets up their own access key which is encrypted when put in the database. Two, any admin that tries to connect with the student must have both the email and the access key for that student.  Three, their profile is only accessible by an admin that they connect with. This third point needs further explaining, which I provide below.

When an admin logs in and goes to their students' profiles of results, they are accessing only their own students' data.  The url for getting student data is of the form "/studentProfile-:id". The id is a number representing the student that is in the collection of student profiles that the particular admin is connected to. For instance, if a particular admin has one student connection, then they will have a student at :id = 0. However, they will not have a student at :id = 1. And if the admin tries to connect to a student at :id = 1 by going to page "/studentProfile-1", the admin will get a page stating "no student at index." That is because that particular admin does not have a student at index 1.  

Admin can create their own questions that will only be shared with the students connected to them. In order for an admin to get connected with the student, they must provide accurate email and access key information for that particular student.
