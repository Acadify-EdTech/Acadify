#include <iostream>
#include <cctype> // for isalnum function
#include <string>
#include <algorithm> // for reverse function

using namespace std;

bool is_palindrome(const string& s) {
    // Removing non-alphanumeric characters and converting to lowercase
    string clean_s;
    for (char c : s) {
        if (isalnum(c)) {
            clean_s += tolower(c);
        }
    }
    // Checking if the cleaned string is equal to its reverse
    return equal(clean_s.begin(), clean_s.begin() + clean_s.size()/2, clean_s.rbegin());
}

void palindrome_checker(const string& input_str) {
    if (is_palindrome(input_str)) {
        cout << input_str << " is a palindrome" << endl;
    } else {
        cout << input_str << " is not a palindrome" << endl;
    }
}

int main() {
    // Test cases
    string test_cases[] = {
        "race car",
        "madam",
        "hello",
        "12321",
        "A man, a plan, a canal: Panama"
    };

    for (const string& test_case : test_cases) {
        palindrome_checker(test_case);
    }

    return 0;
}