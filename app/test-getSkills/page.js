export default async function handler(req, res) {
  try {
    const response = await fetch('http://localhost:3000/api/skills');
    if (!response.ok) {
      throw new Error('Failed to fetch skills');
    }
    const skills = await response.json();
    res.status(200).json(skills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
