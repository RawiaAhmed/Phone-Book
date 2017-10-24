angular.module('phoneBookApp', []).controller('PhoneBookCtrl', function($scope) {
    $scope.phoneRegex = /^\d{2}\-\d{3}\-\d{4}$/;
    $scope.emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    /**
     * This function is the constructor of the phonebook that creates the array that will hold the data.
     */
    $scope.PhoneBook = function() {
        this.phoneBookArray = [];
    };

    $scope.PhoneBook.prototype = {
        /**
         * This function checks the validation of the contactInfo name, phone and email.
         */
        _isValidContact: function(contactInfo) {
            var validContact = true;
            validContact &= (contactInfo.name && contactInfo.name.length <= 100);
            validContact &= (contactInfo.phone && $scope.phoneRegex.test(contactInfo.phone));
            validContact &= (contactInfo.email && $scope.emailRegex.test(contactInfo.email));
            return validContact;
        },
        /**
         * This function sorts the phoneBookArray alphabetically by name.
         */
        _sortPhoneBook: function() {
            this.phoneBookArray.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
        },
        /**
         * This function searches for the existence of contactInfo in phoneBookArray.
         */
        _findPhoneBook: function(contactInfo) {
            var foundPhoneBook = this.phoneBookArray.find(item => {
                return contactInfo.name === item.name && contactInfo.phone === item.phone && contactInfo.email === item.email;
            });
            if (foundPhoneBook) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * This function adds a new contactInfo after checking validation and previous existence to prevent redundancy.
         * sorts the phonebook array after adding
         * returns positive value "length of phonebook array" in case of added successfully and -1 in case of failure
         */
        add: function(contactInfo) {
            if (this._isValidContact(contactInfo) && !this._findPhoneBook(contactInfo)) {
                this.phoneBookArray.push(contactInfo);
                this._sortPhoneBook();
                return this.phoneBookArray.length;
            } else return -1;
        },
        /**
         * This function removes the contact that at position "index" from the phoneBookArray.
         */
        remove: function(index) {
            if (!isNaN(index) && index < this.phoneBookArray.length) {
                this.phoneBookArray.splice(index, 1);
                return 1;
            } else return -1;
        },
        /**
         * This function searches in the phoneBookArray in name or phone based on given query.
         */
        search: function(query) {
            var searchResult = [];
            if (query) {
                var q = query.toString().toLowerCase();
                searchResult = this.phoneBookArray.filter(item => {
                    return (item.name.toLowerCase().indexOf(q) > -1 || item.phone.indexOf(q) > -1);
                });
            }
            return searchResult;
        },
        /**
         * This function returns array of phonebooks from the phoneBookArray given   two  parameters:  contactsPerPage  and  page  
         * returns  a  list  of contacts based on the passed parameters and ordered alphabetically by name.
         * returns the whole array if no parameters where passed
         * returns an empty array if the page doesn't exist
         */
        list: function(contactsPerPage, page) {
            if (!isNaN(contactsPerPage) && !isNaN(page)) {
                var startIndex = contactsPerPage * page;
                var endIndex = startIndex + contactsPerPage + 1;
                return this.phoneBookArray.slice(startIndex, endIndex);
            } else if (!contactsPerPage && !page) {
                return this.phoneBookArray;
            } else {
                return [];
            }
        },
    };

    $scope.myPhoneBook = new $scope.PhoneBook();
});