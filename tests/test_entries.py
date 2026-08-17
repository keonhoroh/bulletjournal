def signup_and_login(client, username, password):
    client.post("/signup", data={"username": username, "password": password})
    client.post("/login", data={"username": username, "password": password})


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
