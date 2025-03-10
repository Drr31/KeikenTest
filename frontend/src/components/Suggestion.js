const Suggestions = ({ suggestion }) => {
  if (!suggestion) {
    return <p>Loading suggestion...</p>;
  }

  return (
    <div>
      <h2>Activity Suggestion</h2>
      <p>{suggestion}</p>
    </div>
  );
};

export default Suggestions;
