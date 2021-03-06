
otherwise.

jsx(Form, jsx(Form)):- !.
jsx(Form, jsx(Form, Goals)):- Goals.

:-meta_predicate(call(0,?)).

call(A,B):-
	( A = Module:InGoal->
            InGoal =.. [Name|Args],
            append(Args, [B], NewArgs),
            Goal =.. [Name|NewArgs],
            call(Module:Goal)
        ; A =.. [Name|Args],
          append(Args, [B], NewArgs),
          Goal =.. [Name|NewArgs],
          call(Goal)
        ).

:-meta_predicate(call(0,?,?)).

call(A,B,C):-
	( A = Module:InGoal->
            InGoal =.. [Name|Args],
            append(Args, [B,C], NewArgs),
            Goal =.. [Name|NewArgs],
            call(Module:Goal)
        ; A =.. [Name|Args],
          append(Args, [B,C], NewArgs),
          Goal =.. [Name|NewArgs],
          call(Goal)
        ).


bubble_event(List, Key, Event):-
	'.'(List, Key, Handler),
	( Handler \== {null}->
            bubble_event(Handler, Event)
        ; otherwise->
            true
        ).

between(Low, High, I):-
        High >= Low,
        ( I = Low
        ; II is Low+1,
          between(II, High, I)
        ).

vdiff_warning(X):-
        writeln(X).

debug_message(X):-
        writeln(X).

:-meta_predicate(on_server(0)).

on_server(Goal):-
        '_on_server'(Goal).

string(_):- fail.

expand_children(A, B):-
        expand_children([A], [B], []).

expand_children([], T, T):- !.
expand_children([element(A, B, C)|D], [element(A,B,CC)|DD], T):- !,
        expand_children(C, CC, []),
        expand_children(D, DD, T).
expand_children([widget(A, B, C)|D], [widget(A,B,CC)|DD], T):- !,
        expand_children(C, CC, []),
        expand_children(D, DD, T).
expand_children([list([])|D], AA, T):- !,
        expand_children(D, AA, T).
expand_children([list([A|As])|D], AA, T):- !,
        expand_children([A], AA, T1),
        expand_children(As, T1, T2),
        expand_children(D, T2, T).
expand_children([[]|D], AA, T):- !,
        expand_children(D, AA, T).
expand_children([[A|As]|D], AA, T):- !,
        expand_children([A], AA, T1),
        expand_children(As, T1, T2),
        expand_children(D, T2, T).
expand_children(Other, _, _):-
        writeq(failed_to_expand(Other)), nl, fail.