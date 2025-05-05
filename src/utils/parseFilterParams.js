const parseContactType = (contactType) => {
  const contactTypes = ['personal', 'home', 'work'];

  if (contactTypes.includes(contactType)) {
    return contactType;
  }
  return null;
};

const parseIsFavourite = (isFavourite) => {
  if (isFavourite === 'true') {
    return true;
  }
  if (isFavourite === 'false') {
    return false;
  }
  return null;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const contactTypeValue = parseContactType(contactType);
  const isFavouriteValue = parseIsFavourite(isFavourite);

  return {
    contactType: contactTypeValue,
    isFavourite: isFavouriteValue,
  };
};
