export default async function GamesPage() {
  const data = await fetch('http://localhost:4000/api/games');
  const value = await data.json();

  interface gameObject {
    game_id: number;
    developer: number;
    name: string;
    description: string;
    release_date?: Date;
    price?: number;
  }

  return (
    <main>
      <h1 className="font-bold mb-5">Game List</h1>
      <ul>
        {value.map((game: gameObject) => (
          <li key={game.game_id}>
            <h2 className="font-medium">{game.name}</h2>
            <p>Descriptiondd: {game.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
