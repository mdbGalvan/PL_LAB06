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

// ***** STATEMENT
statement     = i:ID ASSIGN e:expression            
            { return {type: '=', left: i, right: e}; }
       / IF e:expression THEN statement:statement ELSE sf:statement
           {
             return {
               type: 'IFELSE',
               c:  e,
               statement: statement,
               sf: sf,
             };
           }
       / IF e:expression THEN statement:statement    
           {
             return {
               type: 'IF',
               c:  e,
               statement: statement
             };
           }

// ***** CONDITION
condition   = t:ODD e:expression                        { return {type: t, value: e}; }
            / eL:expression t:COMPARISON eR:expression  { return {type: t, left: eL, right: eR}; }

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

ASSIGN      = _ op:'=' _  { return op; }
ADDMINUS    = _ op:[+-] _ { return op; }
MULDIV      = _ op:[*/] _ { return op; }
LPAREN      = _"("_
RPAREN      = _")"_
DOT         = _ "." _
COMMA       = _ "," _
SEMICOLON   = _ ";" _
COMPARISON  = _ op:$([<>=!]'='/[<>]) _ { return op; }
ID          = _ id:$([a-zA-Z_][a-zA-Z_0-9]*) _ { return { type: 'ID', value: id }; }
NUMBER      = _ digits:$[0-9]+ _ { return { type: 'NUM', value: parseInt(digits, 10) }; }

IF          = _ "if" _
THEN        = _ "then" _
ELSE        = _ "else" _
WHILE       = _ "while" _
DO          = _ "do" _
BEGIN       = _ "begin" _
END         = _ "end" _
CALL        = _ "call" _
CONST       = _ "const" _
VAR         = _ "var" _
PROCEDURE   = _ "procedure" _
ODD         = _ "odd" _

