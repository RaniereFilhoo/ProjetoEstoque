# Generated by Django 5.0.4 on 2024-11-02 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estoqueapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Produto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=100)),
                ('preco', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantidade', models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='Post',
        ),
    ]
