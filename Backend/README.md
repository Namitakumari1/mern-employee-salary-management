Employee Salary Management System (HRMS)

Setup Instructions

1. Clone the repository
git clone <your-repo-link>

2. Install dependencies

Backend
cd Backend
npm install

Frontend
cd Frontend
npm install

3. Create .env file in Backend folder
Copy values from .env.example and update with your database credentials

4. Start Backend
npm start

5. Start Frontend
npm run dev


HRMS Choice

I worked on Employee Salary Management System because it already had structured modules like employee, salary, and attendance, making it easier to extend with overtime functionality.


AI Tools Used

ChatGPT was used for
- Designing overtime validation logic
- Debugging backend issues
- Writing clean code and comments


Overtime Feature (Custom Implementation)

I implemented the overtime feature with additional validations:

- Maximum 6 hours per day
- Cannot enter future date
- Cannot enter data older than 7 days
- One entry per employee per day (duplicate restriction)
- Maximum 60 hours per month

These validations were added to ensure data accuracy and prevent misuse.


Notes

- .env file is not included for security reasons
- Use .env.example as reference