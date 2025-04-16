import json
import re

import fitz


def extract_questions_and_answers(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""

    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text += page.get_text()

    text = re.sub(r'-\d+-.*?(?=\b\d+\.\s|\Z)', '', text, flags=re.DOTALL) 
    q_n_a_list = re.findall(r'\b\d+\.\s.*?(?=\s*\d+\.\s|\Z)' , text, re.DOTALL)

    for q_n_a in q_n_a_list:
        question = re.findall( r'([A-Z][^?]*\?)', q_n_a, re.DOTALL)
    q_and_a = []

    for i in range(len(q_n_a_list)):
        question_block = q_n_a_list[i].strip()
        lines = [line.strip() for line in question_block.splitlines() if line.strip()] 
        if not lines:
            continue
        question = re.sub(r'^\d+\.\s*', '', lines[0]).replace('*','').strip() 

        answers = []
        for line in lines[1:]:
                line = line.replace('▪', '').strip()
                answers.append(line)
        
        q_and_a_pairs = {
             "id": i,
             "question":question, 
             "answers": answers,
             "isFavorite": False  }
        q_and_a.append(q_and_a_pairs)
    
    return q_and_a

pdf_path = "./civics_test_2008.pdf"
q_n_a = extract_questions_and_answers(pdf_path)
json_output = json.dumps(q_n_a, indent=4)
with open('test3.json', 'w') as json_file:
    json.dump(q_n_a, json_file, indent=4)
