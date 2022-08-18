interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  originId: string;
  locationId: string;
  image: string;
  episode: string[];
  url: string;
  userId: string;
}

interface ICreateCharacter {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "unknown";
  originId: string;
  locationId: string;
  image: string;
  episode: string[];
  url: string;
  userId: string;
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
  }

  async getOne({ id }: IGetCharacter) {
    const character = this.characters.find(
      (char) => Number(char.id) === Number(id)
    );
    return character;
  }

  async getAll({ id, name, species }: IGetAllCharacter) {
    const characters = this.characters.filter(
      (char) => String(char.userId) === String(id)
    );

    return characters;
  }

  async delete({ id }: IDeleteCharacter) {
    const characters = this.characters.filter(
      (char) => Number(char.id) !== Number(id)
    );

    return characters;
  }
}
