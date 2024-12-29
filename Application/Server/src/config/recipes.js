const categories = {
  soups: 'Супи',
  starters: 'Предястия',
  mains: 'Основни',
  desserts: 'Десерти',
};

const groups = {
  'Chicken dishes': 'Пилешки ястия',
  'Pork dishes': 'Свински ястия',
  'Vegetarian dishes': 'Вегетариански ястия',
  'Fish dishes': 'Ястия с риба',
  Others: 'Други',
};

const sources = {
  own: 'лични',
  friends: 'приятели',
  public: 'публични',
};

const MAX_RECIPE_IMAGE_SIZE = 5000000; // 5MB
export default { categories, groups, sources, MAX_RECIPE_IMAGE_SIZE };
