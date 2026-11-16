const SearchPet = (mascotasMock,id) => {

  const USER_ID = "1234";

  const usuario = mascotasMock.find((u) => u.userId === USER_ID );

  const pet = usuario?.pets.find((p) => p.microchip === id);

  return [usuario, pet]

};

export default SearchPet;
