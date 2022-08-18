interface Location {
  id: string;
  name: string;
  url: string;
}
interface Origin {
  id: string;
  name: string;
  url: string;
}
interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  location: Location;
  origin: Origin;
  originId: string;
  locationId: string;
  image: string;
  episode: string[];
  url: string;
  userId: string;
  created: Date;
}

interface ICreateCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  location: Location;
  origin: Origin;
  originId: string;
  locationId: string;
  image: string;
  episode: string[];
  url: string;
  userId: string;
  created: Date;
}

interface IGetCharacter {
  id: number;
}

interface IDeleteCharacter {
  id: number;
}

interface IGetAllCharacter {
  id: string;
  name: string;
  species: string;
}

export class CharacterRepositoryInMemory {
  characters: Character[] = [];

  async create(data: ICreateCharacter) {
    const characterCreated = data;

    this.characters.push(characterCreated);

    return characterCreated;
  }

  async getOne({ id }: IGetCharacter) {
    const character = this.characters.find(
      (char) => Number(char.id) === Number(id)
    );
    return character ?? null;
  }

  async getAll({ id, name, species }: IGetAllCharacter) {
    const characters = this.characters.filter(
      (char) => String(char.userId) === String(id)
    );

    return characters;
  }

  async delete({ id }: IDeleteCharacter) {
    this.characters.filter((char) => Number(char.id) !== Number(id));
  }
}
