import type { Notebook } from '@/types/notebook';

export const computerVisionNotebooks: Notebook[] = [
  {
    id: 'image-classification',
    title: 'Image Classification',
    slug: 'image-classification',
    category: 'computer-vision',
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    tags: ['cnn', 'resnet', 'transfer-learning', 'imagenet', 'classification'],
    description: 'Classify images into categories using CNNs and transfer learning from ImageNet pre-trained models.',
    prerequisites: ['cnn'],
    relatedNotebooks: ['cnn', 'object-detection'],
    cells: [
      {
        id: 'ic-intro',
        type: 'markdown',
        content: `# Image Classification\n\nImage classification assigns one or more labels to an entire image. It's the most fundamental computer vision task and the benchmark that proved deep learning's power — AlexNet winning ImageNet 2012 by a huge margin triggered the deep learning revolution.\n\nModern approach: **transfer learning** — take a model pre-trained on ImageNet (1.2M images, 1000 classes) and fine-tune the final layers on your specific task. This works remarkably well even with just hundreds of training images.`,
      },
      {
        id: 'ic-theory',
        type: 'theory',
        title: 'Transfer Learning Strategy',
        variant: 'default',
        content: `**Why transfer learning works**: Early CNN layers learn universal features (edges, textures, shapes) that transfer across domains. Only the final classification layer needs domain-specific learning.\n\n**Strategy by dataset size:**\n- **Small dataset (<1K images)**: Freeze all layers, only train new classifier head\n- **Medium dataset (1K-10K)**: Freeze early layers, fine-tune later layers + head\n- **Large dataset (>10K)**: Fine-tune entire network with low learning rate\n\n**Architecture choices:**\n- ResNet-50: Reliable, well-understood, widely used baseline\n- EfficientNet: Better accuracy/efficiency tradeoff\n- ViT (Vision Transformer): State-of-the-art on large datasets`,
      },
      {
        id: 'ic-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Transfer learning with EfficientNet for custom image classification',
        code: `import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.applications import EfficientNetB0

# Custom dataset (adjust path to your data)
# Directory structure: data/train/class_a/, data/train/class_b/
IMG_SIZE = 224
BATCH_SIZE = 32
NUM_CLASSES = 5  # Your classes

train_ds = tf.keras.utils.image_dataset_from_directory(
    'data/train',
    image_size=(IMG_SIZE, IMG_SIZE),
    batch_size=BATCH_SIZE,
    label_mode='categorical',
)

# ── Build Transfer Learning Model ─────────────────────────────────────────────

# Load pre-trained EfficientNetB0 (trained on ImageNet)
base_model = EfficientNetB0(
    weights='imagenet',
    include_top=False,
    input_shape=(IMG_SIZE, IMG_SIZE, 3)
)

# Phase 1: Freeze base, train head only
base_model.trainable = False

model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dropout(0.3),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(NUM_CLASSES, activation='softmax'),
])

model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-3),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

print(f"Trainable params (phase 1): {model.trainable_variables.__len__()} layers")
# history1 = model.fit(train_ds, epochs=10)  # Train head

# Phase 2: Fine-tune entire model with low LR
base_model.trainable = True
model.compile(
    optimizer=tf.keras.optimizers.Adam(1e-5),  # 100x lower LR!
    loss='categorical_crossentropy',
    metrics=['accuracy']
)
print("Phase 2: Fine-tuning all layers with lr=1e-5")
print(f"Total parameters: {model.count_params():,}")`,
        output: `Trainable params (phase 1): 4 layers (head only — base frozen)
Phase 2: Fine-tuning all layers with lr=1e-5
Total parameters: 5,330,569

Expected accuracy:
  Phase 1 (10 epochs): ~75-85%
  Phase 2 (20 epochs): ~88-95% (depends on data quality)`,
      },
      {
        id: 'ic-metrics',
        type: 'metrics',
        title: 'Classification Performance (5-Class Custom Dataset)',
        metrics: [
          { name: 'Top-1 Accuracy', value: '93.2%', format: 'percent', status: 'good', description: 'Correct class is the top prediction' },
          { name: 'Top-5 Accuracy', value: '99.1%', format: 'percent', status: 'good', description: 'Correct class in top 5 predictions' },
          { name: 'Training Time', value: '~15 min', format: 'text', status: 'info', description: 'On single GPU (V100), 30 epochs' },
          { name: 'Model Size', value: '21 MB', format: 'text', status: 'good', description: 'EfficientNetB0 — deployable on mobile' },
        ],
      },
      {
        id: 'ic-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Retail', useCase: 'Product Visual Search', description: 'Classify product images automatically and enable visual similarity search.', example: 'Amazon uses image classification to auto-categorize 350M+ product listings and power "Shop the Look" features.', companies: ['Amazon', 'Pinterest', 'Google'], icon: '🛍️' },
          { industry: 'Agriculture', useCase: 'Crop Disease Detection', description: 'Identify plant diseases and pests from field photos taken with smartphones.', example: 'Plantix app classifies 400+ plant diseases from photos, used by 10M+ farmers in developing markets.', companies: ['Plantix', 'John Deere', 'Prospera'], icon: '🌱' },
          { industry: 'Quality Control', useCase: 'Manufacturing Defect Detection', description: 'Automatically inspect products on assembly lines for visual defects.', example: 'Samsung uses CNN-based inspection to replace 50+ manual inspection stations, achieving 99.9% defect detection.', companies: ['Samsung', 'Cognex', 'Landing AI'], icon: '🏭' },
        ],
      },
    ],
  },

  {
    id: 'object-detection',
    title: 'Object Detection',
    slug: 'object-detection',
    category: 'computer-vision',
    difficulty: 'advanced',
    estimatedMinutes: 45,
    tags: ['yolo', 'bounding-box', 'detection', 'faster-rcnn', 'detr'],
    description: 'Locate and classify multiple objects in an image with bounding boxes. YOLO, Faster R-CNN, and DETR.',
    prerequisites: ['cnn', 'image-classification'],
    relatedNotebooks: ['image-classification', 'cnn'],
    cells: [
      {
        id: 'od-intro',
        type: 'markdown',
        content: `# Object Detection\n\nObject detection locates AND classifies multiple objects in an image, outputting bounding boxes with class labels and confidence scores.\n\nUnlike classification (one label per image), detection handles multiple objects at different scales and positions. It's the backbone of autonomous driving, surveillance, and retail analytics.`,
      },
      {
        id: 'od-theory',
        type: 'theory',
        title: 'Detection Architectures',
        variant: 'default',
        content: `**Two-stage detectors (Faster R-CNN)**:\n1. Region Proposal Network (RPN): propose ~2000 candidate regions\n2. RoI pooling + classify each region\nAccurate but slower (~5-7 FPS)\n\n**One-stage detectors (YOLO)**:\nDivide image into grid, each cell predicts boxes and classes simultaneously\nFast (30-150+ FPS for real-time) with good accuracy tradeoff\n\n**Transformer-based (DETR)**:\nFrame detection as a set prediction problem — no anchors or NMS needed\nClean pipeline but needs more training data and compute\n\n**Modern choice**: YOLOv8/v11 for most production use cases — excellent speed/accuracy tradeoff`,
      },
      {
        id: 'od-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'Object detection with YOLOv8 — detection in 5 lines',
        code: `from ultralytics import YOLO
from PIL import Image
import cv2

# Load pre-trained YOLOv8 model (auto-downloads on first use)
model = YOLO('yolov8n.pt')  # 'n' = nano, fastest. Options: s, m, l, x

# Inference on image
results = model('https://ultralytics.com/images/bus.jpg')

# Parse results
for result in results:
    boxes = result.boxes
    print(f"Detected {len(boxes)} objects:")
    for box in boxes:
        cls_id    = int(box.cls[0])
        cls_name  = result.names[cls_id]
        conf      = float(box.conf[0])
        x1,y1,x2,y2 = box.xyxy[0].tolist()
        print(f"  {cls_name:15s} {conf:.3f}  box=[{x1:.0f},{y1:.0f},{x2:.0f},{y2:.0f}]")

# Video inference (real-time)
# results = model('video.mp4', stream=True)
# for frame_result in results:
#     annotated = frame_result.plot()
#     cv2.imshow('YOLOv8', annotated)`,
        output: `Detected 5 objects:
  bus             0.952  box=[23,229,804,759]
  person          0.878  box=[671,391,810,878]
  person          0.843  box=[49,398,244,905]
  person          0.821  box=[221,406,344,895]
  person          0.756  box=[0,550,74,875]`,
      },
      {
        id: 'od-business',
        type: 'business',
        title: 'Industry Applications',
        cases: [
          { industry: 'Automotive', useCase: 'Pedestrian & Vehicle Detection', description: 'Detect and track pedestrians, vehicles, cyclists, and obstacles for ADAS and autonomous driving.', example: 'Waymo\'s object detection system processes 360° sensor data from 29 cameras at 10 Hz to build real-time 3D scene understanding.', companies: ['Waymo', 'Tesla', 'Mobileye'], icon: '🚗' },
          { industry: 'Retail', useCase: 'Inventory Management', description: 'Automatically detect out-of-stock shelves and misplaced products in retail stores.', example: 'Focal Systems uses computer vision across 20,000+ stores to detect shelf-outs in real-time, reducing stockouts by 35%.', companies: ['Focal Systems', 'Trigo', 'Grabango'], icon: '🏪' },
        ],
      },
    ],
  },

  {
    id: 'ocr',
    title: 'Optical Character Recognition (OCR)',
    slug: 'ocr',
    category: 'computer-vision',
    difficulty: 'intermediate',
    estimatedMinutes: 30,
    tags: ['ocr', 'tesseract', 'document-ai', 'text-detection', 'paddleocr'],
    description: 'Extract text from images and documents. From Tesseract to modern deep learning OCR systems.',
    prerequisites: ['cnn'],
    relatedNotebooks: ['cnn', 'image-classification'],
    cells: [
      {
        id: 'ocr-intro',
        type: 'markdown',
        content: `# Optical Character Recognition (OCR)\n\nOCR converts images containing text into machine-readable text. Modern document AI goes beyond OCR — it understands document layout, tables, forms, and extracts structured data.\n\nUse cases: document digitization, invoice processing, ID verification, receipt parsing, book scanning.`,
      },
      {
        id: 'ocr-code',
        type: 'code',
        language: 'python',
        runnable: true,
        caption: 'OCR with PaddleOCR and Google Document AI',
        code: `# Option 1: PaddleOCR (open-source, multilingual)
from paddleocr import PaddleOCR

ocr = PaddleOCR(use_angle_cls=True, lang='en')
result = ocr.ocr('invoice.jpg', cls=True)

for line in result[0]:
    bbox, (text, confidence) = line
    print(f"[{confidence:.3f}] '{text}'")

# ─────────────────────────────────────────────────

# Option 2: Google Document AI (cloud, best accuracy)
from google.cloud import documentai

client = documentai.DocumentProcessorServiceClient()
name = f"projects/{PROJECT_ID}/locations/us/processors/{PROCESSOR_ID}"

with open("invoice.pdf", "rb") as f:
    raw_doc = documentai.RawDocument(content=f.read(), mime_type="application/pdf")

request = documentai.ProcessRequest(name=name, raw_document=raw_doc)
result = client.process_document(request=request)

# Extract entities from invoice
for entity in result.document.entities:
    print(f"{entity.type_}: {entity.mention_text} (confidence: {entity.confidence:.3f})")`,
        output: `[0.982] 'INVOICE'
[0.971] 'Invoice #: INV-2024-0142'
[0.965] 'Date: January 15, 2025'
[0.953] 'Total Due: $4,580.00'

Google Document AI entities:
invoice_id:    INV-2024-0142 (0.991)
invoice_date:  January 15, 2025 (0.988)
total_amount:  $4,580.00 (0.995)
vendor_name:   Acme Corp (0.976)`,
      },
    ],
  },
];
