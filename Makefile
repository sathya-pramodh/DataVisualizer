freeze:
	pip freeze > api/requirements.txt

deps:
	pip install -r api/requirements.txt
	cd frontend/ && npm i

run-backend:
	cd api && python3 api.py

run-frontend:
	cd frontend && npm run dev
