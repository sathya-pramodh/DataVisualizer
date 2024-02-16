freeze:
	pip freeze > api/requirements.txt

deps:
	pip install -r api/requirements.txt
	cd frontend/ && npm i

run-backend:
	python3 api/api.py

run-frontend:
	cd frontend && npm run dev
