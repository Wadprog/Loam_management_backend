echo "Waiting for the database to be ready..."

./wait-for prestamo_db:3306 
echo "Database is up"

echo "Migrating database"
npm run migrate

echo "Seeding database"
npm run seed

echo "Starting server"
npm run dev 