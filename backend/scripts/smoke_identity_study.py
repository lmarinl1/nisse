#!/usr/bin/env python3
"""API smoke for identity-and-study-objects."""
from __future__ import annotations

import json
import sys
import time
import urllib.error
import urllib.request

BASE = "http://127.0.0.1:8000/api"


def call(method: str, path: str, body: dict | None = None, token: str | None = None):
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Token {token}"
    req = urllib.request.Request(
        f"{BASE}{path}",
        data=data,
        headers=headers,
        method=method,
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            payload = json.loads(raw) if raw else None
            return resp.status, payload
    except urllib.error.HTTPError as exc:
        raw = exc.read().decode()
        try:
            payload = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            payload = raw
        return exc.code, payload


def main() -> int:
    username = f"smoke{int(time.time())}"
    password = "research-lab-pass-1"

    status, health = call("GET", "/health/")
    assert status == 200, health

    status, auth = call(
        "POST",
        "/auth/register/",
        {"username": username, "password": password},
    )
    assert status == 201, auth
    token = auth["token"]
    assert auth["profile"]["username"] == username

    status, studies = call("GET", "/studies/", token=token)
    assert status == 200 and studies == [], studies

    status, created = call(
        "POST",
        "/studies/",
        {"name": "Futuros del agua", "description": "Exploracion"},
        token=token,
    )
    assert status == 201, created
    study_id = created["id"]

    status, detail = call("GET", f"/studies/{study_id}/", token=token)
    assert status == 200 and detail["name"] == "Futuros del agua", detail

    status, patched = call(
        "PATCH",
        f"/studies/{study_id}/",
        {"description": "Actualizado"},
        token=token,
    )
    assert status == 200 and patched["description"] == "Actualizado", patched

    status, archived = call("POST", f"/studies/{study_id}/archive/", token=token)
    assert status == 200 and archived["status"] == "archived", archived

    status, studies = call("GET", "/studies/", token=token)
    assert status == 200 and studies == [], studies

    print("SMOKE_OK", username, study_id)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:  # noqa: BLE001
        print("SMOKE_FAIL", exc, file=sys.stderr)
        raise SystemExit(1) from exc
