const fetchUser = async (search) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${search}`
  );
  const json = await response.json();
  return json.items.map((item) => item.login);
};

export default fetchUser;
