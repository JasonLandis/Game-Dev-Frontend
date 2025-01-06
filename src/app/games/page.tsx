export default async function GamesPage() {
  let value: gameObject[] = [];
  let fetchError = false;

  try {
    const response = await fetch('http://localhost:4000/api/games');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    value = await response.json();
  } catch (error) {
    console.error('Error fetching games:', error);
    fetchError = true;
  }

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
      {fetchError ? (
        <p className="text-red-500">Failed to load games. Please try again later.</p>
      ) : (
        <ul>
          {value.map((game: gameObject) => (
            <li key={game.game_id}>
              <h2 className="font-medium">{game.name}</h2>
              <p>Description: {game.description}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
