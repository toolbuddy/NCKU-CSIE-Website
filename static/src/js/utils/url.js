class UrlUtils {
    constructor (host, languagId) {
        this.host = host;
        this.languagId = languagId;
    }

    static serverUrl (urlUtils) {
        return ({href = '', query = null} = {}) => {
            if (!query)
                return `${urlUtils.host}/${href}?languageId=${urlUtils.languagId}`;
            const queryStr = Reflect.ownKeys(query).
            map(key => `${key}=${query[key]}`).
            join('&');
            if (typeof (query) === 'object' && Object.prototype.hasOwnProperty.call(query, 'languageId'))
                return `${urlUtils.host}/${href}?${queryStr}`;
            return `${urlUtils.host}/${href}?${queryStr}&languageId=${urlUtils.languagId}`;
        };
    }
}

export default UrlUtils;
