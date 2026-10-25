import { useState } from "react";
import { useNavigate } from "react-router";
import { createExposition } from "../services/expositions";

export default function ExpoForm() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const cleanedTitle = title.trim();
    if (!cleanedTitle) return;

    const expositions = createExposition(cleanedTitle);
    const exposition = expositions.at(-1);

    navigate(`/expositions/${exposition.id}`);
  }

  return (
    <form className="expo-form" onSubmit={handleSubmit}>
      <input
        name="title"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Titre"
      />
      <button type="submit">Valider</button>
    </form>
  );
}
