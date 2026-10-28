function enableChosenAliasSearch(select) {
    let chosen = $(select).data("chosen");
    if (!chosen) return;
    chosen.winnow_results = function (options) {
        this.no_results_clear();

        let results = 0;
        let query = this.get_search_text();
        let escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        let regex = this.get_search_regex(escapedQuery);

        for (let option of this.results_data) {
            option.search_match = false;
            let resultsGroup = null;
            let searchMatch = null;
            let aliasMatch = false;
            option.highlighted_html = "";

            if (this.include_option_in_results(option)) {
                if (option.group) {
                    option.group_match = false;
                    option.active_options = 0;
                }

                if (option.group_array_index != null && this.results_data[option.group_array_index]) {
                    resultsGroup = this.results_data[option.group_array_index];
                    if (resultsGroup.active_options === 0 && resultsGroup.search_match) results++;
                    resultsGroup.active_options++;
                }

                let text = option.group ? option.label : option.text;

                if (!(option.group && !this.group_search)) {
                    searchMatch = this.search_string_match(text, regex);
                    if (!searchMatch && !option.group) {
                        let sourceOption = this.form_field.options[option.options_index];
                        let aliases = sourceOption?.getAttribute("data-search");
                        if (aliases) {
                            searchMatch = this.search_string_match(aliases, regex);
                            aliasMatch = searchMatch != null;
                        }
                    }
                    option.search_match = searchMatch != null;

                    if (option.search_match && !option.group) results++;

                    if (option.search_match) {
                        if (query.length) {
                            if (aliasMatch) option.highlighted_html = this.escape_html(text);
                            else {
                                let startpos = searchMatch.index;
                                let prefix = text.slice(0, startpos);
                                let fix = text.slice(startpos, startpos + query.length);
                                let suffix = text.slice(startpos + query.length);
                                option.highlighted_html = `${this.escape_html(prefix)}<em>${this.escape_html(fix)}</em>${this.escape_html(suffix)}`;
                            }
                        }
                        if (resultsGroup) resultsGroup.group_match = true;
                    } else if (option.group_array_index != null && this.results_data[option.group_array_index].search_match) {
                        option.search_match = true;
                    }
                }
            }
        }

        this.result_clear_highlight();

        if (results < 1 && query.length) {
            this.update_results_content("");
            this.no_results(query);
        } else {
            this.update_results_content(this.results_option_build());
            if (!options?.skip_highlight) this.winnow_results_set_highlight();
        }
    };
}
