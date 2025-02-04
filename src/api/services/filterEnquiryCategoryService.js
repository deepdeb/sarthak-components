const { readPool } = require('../../config/mysql')

exports.filterEnquiryCategory = async (data) => {
    try {
        let select_condition = ''
        if(data.sbu_id != 0) {
            select_condition = "WHERE sales_person_id = " + data.sales_person_id +""
        }
        if (data.filterby_keyword == 'enquiry_source' || data.filterby_keyword == 'principal_house' || data.filterby_keyword == 'basic_value' || data.filterby_keyword == 'tentative_finalization_month' || data.filterby_keyword == 'tentative_finalization_year' || data.filterby_keyword == 'reff_number') {
            let sql = "SELECT distinct " + data.filterby_keyword + " as name FROM enquiry "+ select_condition +""
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'enquiry_date') {
            let sql = "SELECT distinct DATE_FORMAT(enquiry_date, '%Y-%m-%d') as name FROM enquiry "+ select_condition +""
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'salesperson') {
            let sql = "SELECT distinct sales_person_name as name FROM sales_person WHERE is_deleted = 0"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'customer') {
            let sql = "SELECT customer as name FROM customer WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
        else if (data.filterby_keyword == 'enquiry_type') {
            let sql = "SELECT enquiry_type_name as name FROM enquiry_type WHERE is_deleted = 0 AND is_active = 1"
            const [resp] = await readPool.query(sql)
            const total_count = resp.length
            return [resp, total_count]
        }
    } catch (error) {
        console.log('Filter enquiry category service error: ', error);
        return;
    }
}