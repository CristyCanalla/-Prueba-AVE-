import { Pagination } from 'react-bootstrap';


function tableOrderBy(key, orderBy, listItems) {
    if (orderBy.campo != key) {
        orderBy.order = 'asc';
    } else {
        orderBy.order = orderBy.order == 'asc' ? 'desc' : 'asc';
    }
    orderBy.campo = key;
    var list = [...listItems];

    if (orderBy.order == 'asc') {
        try {
            list.sort((a, b) => (a[key].toLowerCase() > b[key].toLowerCase()) ? 1 : ((b[key].toLowerCase() > a[key].toLowerCase()) ? -1 : 0));
        } catch (e) {
            list.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
        }
    } else {
        try {
            list.sort((a, b) => (a[key].toLowerCase() < b[key].toLowerCase()) ? 1 : ((b[key].toLowerCase() < a[key].toLowerCase()) ? -1 : 0));
        } catch (e) {
            list.sort((a, b) => (a[key] < b[key]) ? 1 : ((b[key] < a[key]) ? -1 : 0));
        }
    }
    let listReturn = {
        orderBy: orderBy,
        list: list
    }
    return listReturn;
}



function generatePagination(pag, listItems, filters, searchListItems, itemsPerPage = 10, onPaginar) {
    let items = []
    var list = listItems.filter(function (itemForFilter) {
        if (searchListItems != '') {
            let validItem = false;
            Object.keys(itemForFilter).forEach(function (keyFilter) {
                let found = filters.find(function (element) {
                    return element == keyFilter;
                });
                if (found && itemForFilter[keyFilter].toString().toLowerCase().indexOf(searchListItems.toLowerCase()) != -1) {
                    validItem = true;
                }
            });
            return validItem;
        }
        return true;
    })
    for (let index = 0; index < Math.ceil(list.length / itemsPerPage); index++) {
        items.push(
            <Pagination.Item key={index + 1} active={(index + 1) == pag} onClick={() => { onPaginar(index + 1) }}>
                {index + 1}
            </Pagination.Item>
        );
    }
    return items;
}

export {
    tableOrderBy,
    generatePagination
}