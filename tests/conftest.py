import os

os.environ["DATABASE_URL"] = "postgresql://localhost/bulletjournaldb_test"
os.environ["SECRET_KEY"] = "test-secret-key"

import pytest

from app import app, db


# gives each test a fresh Flask test client backed by empty, real tables in
# the dedicated test database, torn down again after the test finishes
@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.app_context():
        db.create_all()
    with app.test_client() as client:
        yield client
    with app.app_context():
        db.session.remove()
        db.drop_all()
