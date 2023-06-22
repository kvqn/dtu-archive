import re

REMOVE_REGEXES = [
    r"^ *Delhi +Technological +University *$",
    r"^ *\(.*$",
    r"^ *\( *Formerly +Delhi +College +of +Engineering *\) *$",
    r"^ *Regular +Result +Notification *$",
    r"^ *THE +RESULT.*$",
    r"^ *Program.*$",
    r"^ *Branch.*$",
    # r"^ *[A-Z]+[0-9]* +:.*$",
    # r"^ *[A-Z]+[0-9]*[a-z]? +:.*$",
    r"^ *[A-Za-z0-9\- ]+ +:.*$",
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
    r"^ *HARMONY.*$",  # if someone has this name i will cry
    r"^ *MANAGEMENT.*$",
    r"^.*BASIC MECHANICAL ENGINEERING.*$",
    r"^ *Students\).*$",
    r"^ *: APPLIED MATHEMATICS.*$",
    r"^ *EquipmentDesign.*$",
    r"^ *APPLICATIONS.*$",
    r"^ *: BUSINESS.*$",
    r"^ *: METHODS.*$",
    r"^ *EE207.*$",
    r"^ *MEASUREMENT.*$",
    r"^ *:.+$",
    r"^ *ANALYSIS.*$",
    r"^ *MICROBIOLOGY.*$",
    r"^ *DESIGN.*$",
    r"^ *Engineering.*$",
    r"^ *AND.*$",
    r"^ *METHODS.*$",
    r"^ *Regular Result Notification.*$",
    r"^ *ENGINEERING.*$",
    r"^ *RIGHTS.*$",
    r"^ *DISORDERS.*$",
    r"^ *DEVELOPMENT.*$",
    r"^ *INNOVATION.*$",
    r"^ *ECONOMIC.*$",
    r"^ *MITIGATION.*$",
    r"^ *TRANSPORTATION.*$",
    r"^ *SYSTEMS.*$",
    r"^ *System.*$",
    r"^ *ARCHITECTURE.*$",
    r"^ *NETWORKS.*$",
    r"^ *CONVERSION.*$",


]

REMOVE_REGEXES_NON_MULTILINE = [
    r"(?<=\n) *Credits *\n *\d.*(?=\n)"
]

def declutter(text : str, save_path : str | None = None):
    print("Decluttering")
    for regex in REMOVE_REGEXES_NON_MULTILINE:
        text = re.sub(regex, "", text)
    for regex in REMOVE_REGEXES:
        text = re.sub(regex, "", text, flags=re.MULTILINE)
    print("Decluttered")
    if save_path:
        with open(save_path, "w") as file:
            file.write(text)
        print(f"Successfully declutterd. Output saved to {save_path}.")
    return text

def declutter_and_save(input_path : str, output_path : str):
    with open(input_path, "r") as file:
        text = file.read()
    text = declutter(text)
    with open(output_path, "w") as file:
        file.write(text)
    print(f"Successfully declutterd. Output saved to {output_path}.")
    print("Next step is csv/excel extraction")
        
        
