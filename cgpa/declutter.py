import re

REMOVE_REGEXES = [
    r"^ *Delhi +Technological +University *$",
    r"^ *\(.*$",
    r"^ *\( *Formerly +Delhi +College +of +Engineering *\) *$",
    r"^ *Regular +Result +Notification *$",
    r"^ *THE +RESULT.*$",
    r"^ *Program.*$",
    r"^ *Branch.*$",
    r"^ *[A-Z]+[0-9]* +:.*$",
    r"^ *Credits.*$",
    r"^ *Any +discrepancy.*$",
    r"^ *Digitally +Signed.*$",
    r"^ *Controller.*$",
    r"^ *Date.*$",
    r"^ *valid +only.*$",
    r"^ *Visit.*$",
    r"^ *Sem +:.*$",
    r"^ *PRESENTATION +SKILLS.*$",
    r"^.*4 +4 + 4+.*$",
    r"^ *HARMONY.*$", # if someone has this name i will cry
    r"^ *MANAGEMENT.*$",
    r"^.*BASIC MECHANICAL ENGINEERING.*$",
    r"^ *Students\).*$",
]

def declutter(text : str):
    for regex in REMOVE_REGEXES:
        text = re.sub(regex, "", text, flags=re.MULTILINE)
    return text

def declutter_and_save(input_path : str, output_path : str):
    with open(input_path, "r") as file:
        text = file.read()
    text = declutter(text)
    with open(output_path, "w") as file:
        file.write(text)
    print(f"Successfully declutterd. Output saved to {output_path}.")
    print("Next step is csv/excel extraction")
        
        