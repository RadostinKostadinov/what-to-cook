const categories = {
  soups: 'Супи',
  starters: 'Предястия',
  mains: 'Основни',
  desserts: 'Десерти',
  others: 'Други',
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

const PUBLIC_RECIPES_CREATOR_MONGO_ID = '64d3b9a0d4c7c9e9d4c7c9e9';

const MAX_RECIPE_IMAGE_SIZE = 5000000; // 5MB
export default { categories, groups, sources, PUBLIC_RECIPES_CREATOR_MONGO_ID, MAX_RECIPE_IMAGE_SIZE };
