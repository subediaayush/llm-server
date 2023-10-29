from transformers import Wav2Vec2Processor, SEWDForCTC
from datasets import load_dataset
import soundfile as sf
import torch
 
# load the model and preprocessor
processor = Wav2Vec2Processor.from_pretrained("asapp/sew-d-tiny-100k-ft-ls100h")
model = SEWDForCTC.from_pretrained("asapp/sew-d-tiny-100k-ft-ls100h")

# load the dummy dataset with speech samples
ds = load_dataset("patrickvonplaten/librispeech_asr_dummy", "clean", split="validation")
input_file = sf.read('jfk.wav')
 
# preprocess
raw_input = ds[0]["audio"]["array"]
raw_input = input_file
input_values = processor(raw_input, return_tensors="pt").input_values  # Batch size 1

# retrieve logits
logits = model(input_values).logits
 
# take argmax and decode
predicted_ids = torch.argmax(logits, dim=-1)
transcription = processor.batch_decode(predicted_ids)
print(transcription)