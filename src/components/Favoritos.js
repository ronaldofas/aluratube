import styled from "styled-components";

const StyledPersons = styled.div`
    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`
export default function Favoritos(props) {
    const persons = Object.keys(props.favoritos)
    return (
      <StyledPersons>
        {persons.map((person) => {
            return (
                <section key={person.id}>
                    <a key={person.twitter_username} href={person.url}>
                        <img key={person.person_name} src={person.photo} className="user-info" />
                        {person.twitter_username}
                    </a>
                </section>
            )
        })}
      </StyledPersons>
    );
  }
