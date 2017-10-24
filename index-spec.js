describe('PhoneBookCtrl', function() {
    var scope, createController, controller;

    beforeEach(module('phoneBookApp'));

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();

        createController = function() {
            return $controller('PhoneBookCtrl', {
                '$scope': scope
            });
        };
        controller = createController();
    }));

    // Test some basic expectations about the controller
    it('should have email and phone regex defined', function() {
        expect(scope.phoneRegex).toBeDefined();
        expect(scope.emailRegex).toBeDefined();
    });

    it('should have constructor defined', function() {
        var myPhoneBook = new scope.PhoneBook();
        expect(myPhoneBook.phoneBookArray).toBeDefined();
    });

    it('should call add new phonebook', function() {
        var myPhoneBook = new scope.PhoneBook();
        myPhoneBook.add({
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        });
        expect(myPhoneBook.phoneBookArray.length).toEqual(1);
    });

    it('should remove phonebook', function() {
        var myPhoneBook = new scope.PhoneBook();
        myPhoneBook.add({
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        });
        expect(myPhoneBook.remove(2)).toEqual(-1);
        expect(myPhoneBook.remove(0)).toEqual(1);
    });

    it('should search for phonebook using query', function() {
        var myPhoneBook = new scope.PhoneBook();
        myPhoneBook.add({
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        });
        expect(myPhoneBook.search('test')).toEqual([]);
        expect(myPhoneBook.search('02')).toEqual([{
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        }]);
    });

    it('should list phonebooks', function() {
        var myPhoneBook = new scope.PhoneBook();
        myPhoneBook.add({
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        });
        expect(myPhoneBook.list()).toEqual([{
            name: 'John Smith',
            phone: '02-234-9182',
            email: 'j.smith@mail.com'
        }]);
    });
});