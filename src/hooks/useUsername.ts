import { useEffect, useState } from "react";
import { STORAGE_KEYS, readString, writeString } from "@/lib/storage";

/** Fired on `window` when the visitor renames themselves via `setname`. */
export const USERNAME_EVENT = "usernamechange";

export const DEFAULT_USERNAME = "guest";

export function getUsername(): string {
  return readString(STORAGE_KEYS.username) || DEFAULT_USERNAME;
}

/** Persists the visitor's chosen name and notifies every subscriber. */
export function setStoredUsername(name: string): void {
  writeString(STORAGE_KEYS.username, name);
  window.dispatchEvent(new CustomEvent<string>(USERNAME_EVENT, { detail: name }));
}

/** The visitor's name, kept in sync between the terminal and the command bar. */
export function useUsername(): string {
  const [username, setUsername] = useState(DEFAULT_USERNAME);

  useEffect(() => {
    setUsername(getUsername());
    const onChange = (e: Event) =>
      setUsername((e as CustomEvent<string>).detail || DEFAULT_USERNAME);
    window.addEventListener(USERNAME_EVENT, onChange);
    return () => window.removeEventListener(USERNAME_EVENT, onChange);
  }, []);

  return username;
}
