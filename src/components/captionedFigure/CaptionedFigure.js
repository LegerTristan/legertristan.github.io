import './CaptionedFigure.css';

function CaptionedFigure({imgSrc, imgAlt, captionText})
{
    return(
        <article className="captionedFigure">
            <img src={imgSrc} alt={imgAlt}/>
            <figure>{captionText}</figure>
        </article>
    );
}

export default CaptionedFigure;