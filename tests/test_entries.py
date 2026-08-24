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


def test_editing_an_entry_updates_it(client):
    signup_and_login(client, "alice", "alicepass123")
    response = client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "before edit",
        "rating": 5,
        "habits": ["exercise"]
    })
    entry_id = response.get_json()["id"]

    response = client.put(f"/api/entries/{entry_id}", json={
        "date": "2024-08-17",
        "highlight": "after edit",
        "rating": 9,
        "habits": ["exercise"]
    })
    assert response.status_code == 200

    entries = client.get("/api/entries").get_json()
    assert entries[0]["highlight"] == "after edit"
    assert entries[0]["rating"] == 9


def test_deleting_an_entry_removes_it(client):
    signup_and_login(client, "alice", "alicepass123")
    response = client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "to be deleted",
        "rating": 5,
        "habits": []
    })
    entry_id = response.get_json()["id"]

    response = client.delete(f"/api/entries/{entry_id}")
    assert response.status_code == 204

    entries = client.get("/api/entries").get_json()
    assert entries == []


def test_user_cannot_edit_or_delete_another_users_entry(client):
    signup_and_login(client, "alice", "alicepass123")
    response = client.post("/api/entries", json={
        "date": "2024-08-17",
        "highlight": "alice's entry",
        "rating": 5,
        "habits": []
    })
    entry_id = response.get_json()["id"]

    client.post("/logout")
    signup_and_login(client, "bob", "bobpass123")

    put_response = client.put(f"/api/entries/{entry_id}", json={
        "date": "2024-08-17",
        "highlight": "bob's edit",
        "rating": 1,
        "habits": []
    })
    assert put_response.status_code == 404

    delete_response = client.delete(f"/api/entries/{entry_id}")
    assert delete_response.status_code == 404
