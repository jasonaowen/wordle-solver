# Wordle solver

This program tries to figure out what the word of the day is based on completed
Wordle grids!

## Algorithm

The program evaluates each grid to determine eligible words.
A word is a potential answer for a given grid if, for each line, there is at
least one valid word that would produce the given pattern.

For example, this grid would rule out the word `QUEST`:
🟨🟨🟨🟨🟨
🟩🟩🟩🟩🟩

because there aren't any anagrams of `QUEST`.

![Licensed under the AGPL, version 3](https://img.shields.io/badge/license-AGPL3-blue.svg)
