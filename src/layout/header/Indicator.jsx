const Indicator = ({label, count, url, icon}) => {
    return <a href={url} class="indicator">
        <label>{label}</label>
        <div class="icon-count">
            <i class={"sli icon-" + icon}></i>
            <span class="count">{count}</span>
        </div>
    </a>
}

export default Indicator;