/* Add application styles & imports to this file! */
@import '~@angular/material/theming';
@import "~@angular/material/prebuilt-themes/indigo-pink.css";

$mat-recipebook-primary: (
    50 : #fceeee,
    100 : rgb(255, 255, 255),
    200 : #f2b9b9,
    300 : #ed9d9d,
    400 : #e98888,
    500 : #e57373,
    600 : #e26b6b,
    700 : #de6060,
    800 : #da5656,
    900 : #d34343,
    A100 : #ffffff,
    A200 : #fff3f3,
    A400 : #ffc0c0,
    A700 : #ffa7a7,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #000000,
        500 : #000000,
        600 : #000000,
        700 : #000000,
        800 : #ffffff,
        900 : #ffffff,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
    )
);





$mat-recipebook-accent: (
    50 : #f7fef9,
    100 : #eafcef,
    200 : #dcfbe5,
    300 : #cef9da,
    400 : #c4f7d2,
    500 : #b9f6ca,
    600 : #b2f5c5,
    700 : #aaf3bd,
    800 : #a2f2b7,
    900 : #93efab,
    A100 : #ffffff,
    A200 : #ffffff,
    A400 : #ffffff,
    A700 : #ffffff,
    contrast: (
        50 : #000000,
        100 : #000000,
        200 : #000000,
        300 : #000000,
        400 : #000000,
        500 : #000000,
        600 : #000000,
        700 : #000000,
        800 : #000000,
        900 : #000000,
        A100 : #000000,
        A200 : #000000,
        A400 : #000000,
        A700 : #000000,
    )
);





$primary: mat-palette($mat-recipebook-primary);
$accent: mat-palette($mat-recipebook-accent);

$theme: mat-light-theme($primary, $accent);

@include angular-material-theme($theme);

