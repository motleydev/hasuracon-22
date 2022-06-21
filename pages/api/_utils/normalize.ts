const normalize = (input?: string) => {
  return input ? input.toLowerCase() : "no value provided";
};

export default normalize;
