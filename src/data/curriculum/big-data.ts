import type { Section } from '@/types/curriculum';

export const bigDataSection: Section = {
  id: 'big-data',
  title: 'Big Data & Engineering',
  description: 'Data architecture, distributed computing with Spark, and modern data pipelines.',
  longDescription:
    'Modern data systems process petabytes of data across distributed clusters. This section covers the architectures, tools, and patterns used by data engineers at scale.',
  icon: '⚡',
  color: 'orange',
  tags: ['Spark', 'Data Warehouse', 'Data Lake', 'ETL', 'Airflow', 'SQL', 'Cloud'],
  modules: [
    {
      id: 'data-architecture',
      title: 'Data Architecture',
      description: 'Warehouses, lakes, lakehouses, and how data flows through organisations.',
      lessons: [
        {
          id: 'warehouse-vs-lake',
          title: 'Data Warehouse vs Data Lake vs Lakehouse',
          description: 'Understanding modern data storage architectures and when to use each.',
          duration: '45 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## The Evolution of Data Storage\n\nOrganisations face a fundamental challenge: how to store, organise, and access data that comes in many formats (structured tables, unstructured text, images, logs) at massive scale.\n\nThree main architectural patterns have emerged, each with different trade-offs.',
            },
            {
              type: 'compare',
              title: 'Data Warehouse vs Data Lake',
              left: {
                label: 'Data Warehouse',
                items: [
                  'Schema-on-write (structured at load)',
                  'Optimized for SQL analytics',
                  'High cost per GB (columnar storage)',
                  'Best for BI and reporting',
                  'Examples: Snowflake, BigQuery, Redshift',
                ],
              },
              right: {
                label: 'Data Lake',
                items: [
                  'Schema-on-read (structured at query)',
                  'Stores raw data in any format',
                  'Low cost (object storage: S3, GCS)',
                  'Best for ML and exploratory analysis',
                  'Examples: S3 + Athena, GCS + Dataproc',
                ],
              },
            },
            {
              type: 'text',
              content:
                '## The Lakehouse Architecture\n\nThe **Lakehouse** (Databricks, 2021) combines the best of both:\n- **Low-cost storage** of the data lake (object storage)\n- **SQL analytics and ACID transactions** of the warehouse\n- Open formats: **Delta Lake**, **Apache Iceberg**, **Apache Hudi**\n\nDelta Lake adds versioning (time travel), ACID transactions, and efficient upserts to Parquet files on object storage — enabling both analytics and ML on the same data.',
            },
            {
              type: 'text',
              content:
                '## Modern Data Stack\n\nThe "Modern Data Stack" refers to cloud-native tools that compose well:\n- **Ingestion**: Fivetran, Airbyte, Kafka\n- **Storage**: Snowflake, BigQuery, Databricks Lakehouse\n- **Transformation**: dbt (data build tool)\n- **Orchestration**: Apache Airflow, Prefect, Dagster\n- **BI**: Tableau, Looker, Metabase\n- **ML**: MLflow, Vertex AI, SageMaker',
            },
            {
              type: 'keyTakeaways',
              items: [
                'Data Warehouses excel at structured SQL analytics; Data Lakes store raw data cheaply.',
                'The Lakehouse combines both: cheap storage with warehouse-level governance and SQL.',
                'Delta Lake, Iceberg, and Hudi bring ACID transactions to object storage.',
                'dbt transforms data inside the warehouse using SQL, with version control and testing.',
                'Choose architecture based on: data variety, query patterns, team skills, and cost constraints.',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'distributed-computing',
      title: 'Apache Spark & Distributed Computing',
      description: 'Processing data at scale with Spark DataFrames, SQL, and MLlib.',
      lessons: [
        {
          id: 'spark-fundamentals',
          title: 'Apache Spark Fundamentals',
          description: 'The distributed computing engine used by every major data-intensive company.',
          duration: '65 min',
          difficulty: 'intermediate',
          blocks: [
            {
              type: 'text',
              content:
                '## Why Spark?\n\nA single machine can process gigabytes of data with pandas — but what about terabytes or petabytes? **Apache Spark** distributes computation across a cluster of machines, processing data in parallel.\n\nSpark\'s key innovations over its predecessor (Hadoop MapReduce):\n- **In-memory processing**: data stays in RAM between transformations (100× faster)\n- **Lazy evaluation**: Spark plans the entire computation before executing\n- **Unified API**: SQL, DataFrames, Streaming, ML in one framework',
            },
            {
              type: 'text',
              content:
                '## Spark Architecture\n\n- **Driver**: coordinates the computation, runs the SparkSession\n- **Executors**: worker processes on cluster nodes that run tasks\n- **Cluster Manager**: YARN, Kubernetes, or Spark Standalone allocates resources\n- **RDD** (Resilient Distributed Dataset): the fundamental data abstraction — a fault-tolerant collection partitioned across nodes\n- **DataFrame/Dataset**: higher-level API with schema, optimised by Catalyst query planner',
            },
            {
              type: 'text',
              content:
                '## Transformations vs Actions\n\nSpark operations are either:\n- **Transformations**: lazy — return a new DataFrame (select, filter, groupBy, join)\n- **Actions**: trigger execution — return results (show, count, collect, write)\n\nSpark builds a **DAG** (Directed Acyclic Graph) of transformations and only executes when an action is called. This allows the Catalyst optimizer to reorder and optimize operations.',
            },
            {
              type: 'code',
              language: 'python',
              caption: 'PySpark DataFrame operations',
              code: `from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType

# Initialize Spark (local mode for development)
spark = SparkSession.builder \\
    .appName("DataSciencePlatform") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# --- Create a DataFrame ---
schema = StructType([
    StructField("user_id",    StringType(),  True),
    StructField("product_id", StringType(),  True),
    StructField("rating",     DoubleType(),  True),
    StructField("category",   StringType(),  True),
])

data = [("u1","p1",4.5,"Electronics"), ("u1","p2",3.0,"Books"),
        ("u2","p1",5.0,"Electronics"), ("u2","p3",2.5,"Books"),
        ("u3","p2",4.0,"Books"),       ("u3","p3",3.5,"Books")]

df = spark.createDataFrame(data, schema)
df.printSchema()
df.show()

# --- Transformations (lazy) ---
electronics = df.filter(F.col("category") == "Electronics")
top_rated   = df.filter(F.col("rating") >= 4.0)

# Group by category: count and average rating
stats = df.groupBy("category").agg(
    F.count("*").alias("n_reviews"),
    F.round(F.avg("rating"), 2).alias("avg_rating"),
    F.round(F.stddev("rating"), 2).alias("std_rating"),
)

# --- Action: triggers execution ---
stats.show()

# --- Window functions ---
from pyspark.sql.window import Window
window = Window.partitionBy("user_id").orderBy(F.desc("rating"))
df_ranked = df.withColumn("rank", F.rank().over(window))
df_ranked.filter(F.col("rank") == 1).show()  # top-rated per user

# --- SQL interface ---
df.createOrReplaceTempView("reviews")
spark.sql("""
    SELECT category,
           COUNT(*) as count,
           ROUND(AVG(rating), 2) as avg_rating
    FROM reviews
    GROUP BY category
    ORDER BY avg_rating DESC
""").show()`,
            },
            {
              type: 'keyTakeaways',
              items: [
                'Spark distributes data across a cluster, enabling in-memory processing of terabyte-scale datasets.',
                'Transformations are lazy; actions trigger execution — Spark optimizes the entire DAG first.',
                'DataFrames provide a SQL-like API; always prefer them over raw RDDs for performance.',
                'Catalyst optimizer and Tungsten execution engine make DataFrame operations highly efficient.',
                'Use `.explain()` to see the physical query plan and identify performance bottlenecks.',
              ],
            },
          ],
        },
      ],
    },
  ],
};
