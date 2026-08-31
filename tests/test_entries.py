# helper: creates and logs into a throwaway test account
def signup_and_login(client, username, password):
    client.post("/signup", data={"username": username, "password": password})
    client.post("/login", data={"username": username, "password": password})


# confirms a posted entry actually persists and comes back via GET, not just returns 201
def test_posting_an_entry_saves_it(client):
    signup_and_login(client, "alice", "alicepass123")
    response = client.post("/api/entries", json={
        "date": "2024-06-01",
        "highlight": "Learned about Flask testing!",
        "rating": 5,
        "habits": ["exercise", "read"]
    })
    assert response.status_code == 201

    entries = client.get("/api/entries").get_json()
    assert entries[0]["highlight"] == "Learned about Flask testing!"


# confirms entries are scoped per-account, not shared across every logged-in user
def test_user_cannot_see_another_users_entries(client):
    signup_and_login(client, "alice", "alicepass123")
    response = client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "tested the db",
        "rating": 5,
        "habits": ["exercise", "read"]
    })

    client.post("/logout")

    signup_and_login(client, "bob", "bobpass123")
    entries = client.get("/api/entries").get_json()
    assert entries == []


# confirms the immutability rule: a second POST for an already-logged date
# is rejected outright, not silently applied as an update
def test_duplicate_entry_for_same_date_is_rejected(client):
    signup_and_login(client, "alice", "alicepass123")
    client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "first entry",
        "rating": 5,
        "habits": []
    })

    response = client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "trying to overwrite",
        "rating": 9,
        "habits": []
    })

    assert response.status_code == 409
    entries = client.get("/api/entries").get_json()
    assert len(entries) == 1
    assert entries[0]["highlight"] == "first entry"
