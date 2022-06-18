import Styled from 'styled-components';

const CardStyle = Styled.div`
    position: relative;
    flex-wrap: wrap;
    width: 380px;
    height: 380px;
    color:#90f4a9dc;
    background: ${props => `url(${props.background}) no-repeat top center`};
    background-size: cover;
    border-radius: 25px;
    overflow: hidden;
`

export default CardStyle;