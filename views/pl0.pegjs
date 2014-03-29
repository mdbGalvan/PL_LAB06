/*
 * Classic example grammar, which recognizes simple arithmetic expressionressions like
 * "2*(3+4)". The parser generated from this grammar then AST.
 */

{
  var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}

// ***** PROGRAM
program = b:(block)* DOT                                { return { type: 'PROGRAM', block: b }; } 

// ***** BLOCK
block       = CONST a1:assignment a2:(COMMA a21:assignment 
                                                        { return a21; })* SEMICOLON 
                                                        { return { type: 'CONST', value: [a1].concat(a2) }; } 
            / VAR i1:ID i2:(COMMA i21:ID                { return i21; })* SEMICOLON
                                                        { return { type: 'VAR', value: [i1].concat(i2) }; } 
            / p:(PROCEDURE i:ID a:argument? SEMICOLON b:block
                                                        { return { type: 'PROCEDURE', value: i, argument: a, block: b}; })* 
                                            s:statement { return { procedure: p, statement: s}; } 

// ***** STATEMENT
statement   = i:ID ASSIGN e:expression                  { return {type: '=', left: i, right: e}; }
            / CALL i:ID a:argument?                     { return {type:'CALL', value: i, argument: a}; }
            / BEGIN s1:statement s2:(SEMICOLON s21:statement
                                                        { return s21; })* END
                                                        { return { type: 'BEGIN', value: [s1].concat(s2) }; }
            / IF c:condition THEN s:statement ELSE sf:statement
                                                        { return { type: 'IFELSE', c: c, s: s, sf:sf, }; }
            / IF c:condition THEN s:statement           { return { type: 'IF', c: c, s: s }; }
            / WHILE c:condition DO s:statement          { return { type: 'WHILE', c: c, s: s }; }

// ***** ASSIGNMENT
assignment    = i:ID ASSIGN n:NUMBER                    { return {type: '=', left: i, right: n}; }

// ***** ARGUMENT
argument      = LPAREN i1:(ID/NUMBER) i2:(COMMA i21:(ID/NUMBER)         
                                                        { return i21; })*
                                                RPAREN  { return [i1].concat(i2); } 

// ***** CONDITION
condition   = ODD e:expression                          { return {type: 'ODD', value: e}; }
            / eL:expression COMPARISON eR:expression    { return {type: 'COMPARISON', left: eL, right: eR}; }

// ***** EXPRESSION
expression  = t:term   r:(ADDMINUS term)*               { return tree(t,r); }

// ***** TERM
term        = f:factor r:(MULDIV factor)*               { return tree(f,r); }

// ***** FACTOR
factor      = NUMBER
            / ID
            / LPAREN t:expression RPAREN                { return t; }

// ***** CONST
_ = $[ \t\n\r]*

ASSIGN      = _ op:'=' _          { return op; }
ADDMINUS    = _ op:[+-] _         { return op; }
MULDIV      = _ op:[*/] _         { return op; }
LPAREN      = _"("_
RPAREN      = _")"_
DOT         = _ "." _
COMMA       = _ "," _
SEMICOLON   = _ ";" _
COMPARISON  = _ op:$([<>=!][=]/[<>]) _ { return op; }
ID          = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ { return { type: 'ID', value: id }; }
NUMBER      = _ digits:$[0-9]+ _ { return { type: 'NUM', value: parseInt(digits, 10) }; }

IF          = _ ("if"/"IF") _
THEN        = _ ("then"/"THEN") _
ELSE        = _ ("else"/"ELSE") _
WHILE       = _ ("while"/"WHILE") _
DO          = _ ("do"/"DO") _
BEGIN       = _ ("begin"/"BEGIN") _
END         = _ ("end"/"END") _
CALL        = _ ("call"/"CALL") _
CONST       = _ ("const"/"CONST") _
VAR         = _ ("VAR"/"var") _
PROCEDURE   = _ ("procedure"/"PROCEDURE") _
ODD         = _ ("odd"/"ODD") _



