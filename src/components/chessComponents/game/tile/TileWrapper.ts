import styled from "styled-components";
import Tile from "../../../../datastructure/tile/tile";

const TileWrapper = styled.div`
    float: left;
    border: ${(props) => props.theme.tile.border}
    min-height: ${(props) => props.theme.tile.height}
    height:${(props) => props.theme.tile.height}
    min-width: ${(props) => props.theme.tile.width}
    width:${(props) => props.theme.tile.width}
    background-color: ${(props) => {
        switch (props.color) {
            case "light":
                return props.theme.tile.light;
            case "dark":
                return props.theme.tile.dark;
        }
    }}
    }}
`;
export default TileWrapper;
