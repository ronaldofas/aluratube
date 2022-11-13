import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu"
import { StyledTimeline } from "../src/components/Timeline";
import React from "react";

function HomePage() {
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    //console.log(valorDoFiltro); return;
    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
                <Header />
                <Timeline searchValue={valorDoFiltro} playlists={config.playlists} >
                    Conteúdo
                </Timeline>
                <Favoritos favoritos={config.favoritos}/>
            </div>
        </>
    );
}

export default HomePage

const StyleHeader = styled.div`
    background-color: ${({theme}) => theme.backgroundLevel1};
    
    .banner {
        width: 100%;
        height: auto;
        min-height: 120px;
        max-height: 18vw;
        object-fit: cover;
        margin-top: 50px;
        border-radius: 0%;
    }
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
function Header() {
    return (
        <StyleHeader>
            <img className='banner' src="/banner-unsplash.jpg" alt="" aria-hidden='true' />

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} className="img" />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyleHeader>
    )
}

function Timeline({searchValue, ...props}) {
    //console.log("Dentro do component", searchValue /*, Object.keys(props)*/);
    const playlistNames = Object.keys(props.playlists);
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];

                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>

                            {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);
                            })
                            .map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </section>
                );
            })}
        </StyledTimeline>
    )
}

const StyledPersons = styled.div`
    .user-info{
        align-items: center;
        height: auto;
        min-height: 60px;
        max-height: 8vw;
        object-fit: cover;
        border-radius: 50%;
    }
    .linha{
        display: inline-block;
        align-items: center;
        padding-right: 3px;
    }
    .coluna{
        display: grid;
        place-items: center;
    }
`
function Favoritos(propriedade) {
    const pessoas = propriedade.favoritos.pessoas
    return (
      <StyledPersons>
        {pessoas.map((person) => {
            return (
                <span className="linha">
                    <ul >
                        <li className="coluna">
                            <a href={person.url}><img src={person.photo} className="user-info" /></a>
                            {person.twitter_username}
                        </li>
                    </ul>
                </span>
            )
        })}
      </StyledPersons>
    );
  }
