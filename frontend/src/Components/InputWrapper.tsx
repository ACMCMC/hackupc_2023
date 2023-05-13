import React from 'react';

const UserFind: React.FC = () => {
  const users = [
    {
      name: 'Syket',
      age: 20,
      designation: 'Software Engineer',
    },
    {
      name: 'Sakib',
      age: 25,
      designation: 'Programmer',
    },
    {
      name: 'Jamy',
      age: 30,
      designation: 'Designer',
    },
    {
      name: 'Hanif',
      age: 20,
      designation: 'UX Writer',
    },
  ];
  const [userList, setUserList] = React.useState<
    { name: string; age: number; designation: string }[] | undefined
  >(users);
  const [text, setText] = React.useState<string>('');

  const handleOnClick = () => {
    const findUsers =
      userList && userList?.length > 0
        ? userList?.filter((u) => u?.name === text)
        : undefined;

    console.log(findUsers);

    setUserList(findUsers);
  };

  return (
    <div>
      <div className="title">
        <h1>User Find</h1>
      </div>
      <div className="input__wrapper">
        <input
          type="text"
          placeholder="Search User"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setUserList(users);
          }}
        />
        <button disabled={!text} onClick={handleOnClick}>
          Search
        </button>
      </div>

      <div className="body">
        {userList && userList?.length === 0 && (
          <div className="notFound">No User Found</div>
        )}

        {userList &&
          userList?.length > 0 &&
          userList?.map((user) => {
            return (
              <div className="body__item">
                <h3>Name: {user?.name}</h3>
                <p>Age: {user?.age}</p>
                <p>Designation: {user?.designation}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserFind;